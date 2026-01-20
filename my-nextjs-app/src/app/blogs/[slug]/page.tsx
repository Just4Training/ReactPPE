// my-nextjs-app/src/app/blogs/[slug]/page.tsx
import Link from 'next/link';
import { notFound } from 'next/navigation';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

async function getBlog(slug: string) {
    try {
        const res = await fetch(`${apiUrl}/blogs/${slug}`, {
        cache: 'no-store',
        });

        if (!res.ok) {
        return null;
        }

        const blog = await res.json();
        return blog;
    } catch (err) {
        console.error('Error fetching blog:', err);
        return null;
    }
}

export default async function BlogDetailPage({
    params,
}: { params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const blog = await getBlog(slug);

    if (!blog) {
        notFound();
    }

    const renderContent = () => {
        if (blog.contentType === 'html' || blog.contentType === 'richtext') {
        return (
            <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: blog.contentRef }}
            />
        );
        }

        if (blog.contentType === 'markdown') {
        // For production, use a proper markdown renderer
        return (
            <div className="prose prose-lg max-w-none whitespace-pre-wrap">
            {blog.content}
            </div>
        );
        }

        return <div className="prose prose-lg max-w-none">{blog.content}</div>;
    };

    return (
        <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Back button */}
        <Link
            href="/blogs"
            className="inline-flex items-center text-blue-600 hover:underline mb-6"
        >
            ← Back to Blogs
        </Link>

        {/* Cover Image */}
        {blog.coverImage && (
            <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-64 md:h-96 object-cover rounded-lg mb-8 shadow-lg"
            />
        )}

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {blog.title}
        </h1>

        {/* Meta information */}
        <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-8 pb-8 border-b border-gray-200">
            <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {blog.author?.username?.[0]?.toUpperCase() || 'A'}
                </div>
            <div>
                <p className="font-medium text-gray-900">{blog.author?.username || 'Anonymous'}</p>
                <p className="text-sm">{blog.author?.email}</p>
            </div>
            </div>
            <span>•</span>
            <time className="text-sm">
            {new Date(blog.publishedAt || blog.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            })}
            </time>
            <span>•</span>
            <span className="text-sm">{blog.viewCount} views</span>
        </div>

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
            {blog.tags.map((tag: string) => (
                <span
                key={tag}
                className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
                >
                #{tag}
                </span>
            ))}
            </div>
        )}

        {/* Content */}
        <article className="mb-12">{renderContent()}</article>

        {/* Edit button (show only to author) */}
        <div className="flex justify-end">
            <Link
            href={`/blogs/edit/${blog._id}`}
            className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
            >
            Edit Post
            </Link>
        </div>
        </main>
    );
    }