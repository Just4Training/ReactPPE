// my-nextjs-app/src/app/blogs/page.tsx
import Link from 'next/link';
import { Blog } from '@/types/Blog';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

async function getBlogs() {
  try {
    const res = await fetch(`${apiUrl}/blogs`, {
      cache: 'no-store',
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch blogs');
    }
    
    const data = await res.json();
    console.log(data);
    return data.data || [];
  } catch (err) {
    console.error('Error fetching blogs:', err);
    return [];
  }
}

export default async function BlogsPage() {
  const blogs = await getBlogs();
  console.log(blogs);

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Blog Posts</h1>
        <Link 
          href="/blogs/new" 
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Create New Post
        </Link>
      </div>

      {blogs.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600 text-lg">No blog posts yet.</p>
          <Link 
            href="/blogs/new" 
            className="text-blue-600 hover:underline mt-2 inline-block"
          >
            Be the first to create one!
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {blogs.map((blog: Blog) => (
            <article 
              key={blog._id} 
              className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition p-6"
            >
              {blog.coverImage && (
                <img 
                  src={blog.coverImage} 
                  alt={blog.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
              
              <Link href={`/blogs/${blog.slug}`}>
                <h2 className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition mb-2">
                  {blog.title}
                </h2>
              </Link>

              {blog.excerpt && (
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {blog.excerpt}
                </p>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>By {blog.author?.username || 'Anonymous'}</span>
                  <span>•</span>
                  <span>{new Date(blog.publishedAt || blog.createdAt).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>{blog.viewCount} views</span>
                </div>

                {blog.tags && blog.tags.length > 0 && (
                  <div className="flex gap-2">
                    {blog.tags.slice(0, 3).map((tag: string) => (
                      <span 
                        key={tag}
                        className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <Link 
                href={`/blogs/${blog.slug}`}
                className="mt-4 inline-block text-blue-600 hover:underline font-medium"
              >
                Read more →
              </Link>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}