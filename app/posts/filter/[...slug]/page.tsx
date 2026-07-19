import { fetchPosts } from '@/lib/api';
import PostsClient from './Posts.client';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

interface PostsPageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function PostsPage({ params }: PostsPageProps) {
  const { slug } = await params;
  const userId = slug[0];
  const queryClient = new QueryClient();

  const searchQuery = '';
  const currentPage = 1;

  await queryClient.prefetchQuery({
    queryKey: ['posts', searchQuery, currentPage, userId],
    queryFn: () =>
      fetchPosts({
        searchText: searchQuery,
        page: currentPage,
        userId,
      }),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostsClient userId={userId} />
    </HydrationBoundary>
  );
}
