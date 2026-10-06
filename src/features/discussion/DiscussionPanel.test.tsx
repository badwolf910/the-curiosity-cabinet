import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { artifacts } from '@/data';
import { DiscussionPanel } from './DiscussionPanel';
import { mockReply } from './mockProvider';

describe('DiscussionPanel', () => {
  it('sends a question and shows the reply', async () => {
    const provider = { reply: vi.fn().mockResolvedValue('It is very old.') };
    render(<DiscussionPanel artifact={artifacts[0]} provider={provider} />);
    await userEvent.type(screen.getByLabelText('Your question'), 'How old?');
    await userEvent.click(screen.getByRole('button', { name: 'Send' }));
    expect(await screen.findByText(/It is very old/)).toBeInTheDocument();
    expect(provider.reply).toHaveBeenCalledOnce();
  });
  it('shows an accessible error when the provider fails', async () => {
    const provider = { reply: vi.fn().mockRejectedValue(new Error('x')) };
    render(<DiscussionPanel artifact={artifacts[0]} provider={provider} />);
    await userEvent.type(screen.getByLabelText('Your question'), 'Hi');
    await userEvent.click(screen.getByRole('button', { name: 'Send' }));
    expect(await screen.findByRole('alert')).toBeInTheDocument();
  });
  it('mock responder answers provenance questions', () => {
    expect(mockReply(artifacts[0], 'Where was it found?')).toBe(artifacts[0].provenance);
  });
});
