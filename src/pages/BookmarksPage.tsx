import { BookmarkShelf } from '@/features/bookmarks/BookmarkShelf';

export default function BookmarksPage() {
  return (
    <>
      <h1 className="page-title">Your shelf</h1>
      <BookmarkShelf />
    </>
  );
}
