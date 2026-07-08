import { Metadata, ResolvingMetadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, Clock, User, Calendar } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';

// SEO: Generate dynamic metadata for the blog post
export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const { data: post } = await supabase
    .from('blogs')
    .select('*')
    .eq('id', id)
    .single();

  if (!post) {
    return {
      title: 'Post Not Found | HB Realty',
    };
  }

  // Strip HTML for the meta description (limit 160 chars)
  const plainTextDescription = post.content.replace(/<[^>]*>?/gm, '').trim().substring(0, 160) + '...';

  return {
    title: `${post.title} | HB Realty Insights`,
    description: plainTextDescription,
    openGraph: {
      title: post.title,
      description: plainTextDescription,
      images: [post.image],
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: plainTextDescription,
      images: [post.image],
    }
  };
}

const calculateReadTime = (text: string) => {
  const wordsPerMinute = 200;
  const words = text ? text.split(/\s+/).length : 0;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min`;
};

export default async function SingleBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  // Server-side fetching for SEO!
  const { data: post, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !post) {
    notFound();
  }

  // JSON-LD for Google Rich Results (SEO)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    image: post.image,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    datePublished: post.date,
    description: post.content.replace(/<[^>]*>?/gm, '').trim().substring(0, 160) + '...',
  };

  return (
    <main className="min-h-screen bg-[#FAF9F6] font-sans selection:bg-[#062B4A] selection:text-white overflow-x-hidden">
      {/* Inject JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ═══ HERO SECTION ═══ */}
      <section className="relative h-[60vh] md:h-[80vh] min-h-[500px] w-full flex items-end pb-12 md:pb-24 px-6 md:px-12 bg-[#06111C]">
        <Image 
          src={post.image} 
          alt={post.title} 
          fill 
          className="object-cover opacity-40 animate-fade-in" 
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06111C] via-[#06111C]/60 to-transparent" />
        
        <div className="relative z-10 max-w-[1000px] mx-auto w-full animate-fade-up">
          <Link href="/blog" className="inline-flex items-center gap-3 text-white/60 hover:text-white transition-colors mb-8 group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Back to Insights</span>
          </Link>
          
          <div className="flex flex-wrap items-center gap-4 md:gap-6 text-white/50 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-6">
            <span className="text-[#A98B55]">Insights</span>
            <div className="w-1 h-1 rounded-full bg-white/20" />
            <span className="flex items-center gap-2"><Calendar size={14} className="mb-0.5" /> {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <div className="w-1 h-1 rounded-full bg-white/20" />
            <span className="flex items-center gap-2"><Clock size={14} className="mb-0.5" /> {calculateReadTime(post.content)}</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium text-white tracking-tight leading-[1.1] mb-8">
            {post.title}
          </h1>
          
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border border-white/20 text-white">
              <User size={20} />
            </div>
            <div>
              <p className="text-white text-sm font-medium">{post.author}</p>
              <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mt-1">Author</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CONTENT SECTION (BEAUTIFULLY FORMATTED) ═══ */}
      <section className="py-20 md:py-24 px-6 md:px-12 max-w-[900px] mx-auto bg-white shadow-2xl rounded-t-3xl md:rounded-t-[60px] -mt-10 relative z-20 border border-[#062B4A]/5">
        <div 
          className="prose prose-lg md:prose-xl max-w-none 
          prose-headings:font-medium prose-headings:tracking-tight prose-headings:text-[#062B4A] prose-headings:mb-6
          prose-p:text-[#062B4A]/80 prose-p:font-light prose-p:leading-loose prose-p:mb-8
          prose-a:text-[#A98B55] prose-a:underline prose-a:underline-offset-4 hover:prose-a:text-[#062B4A] transition-colors
          prose-strong:text-[#062B4A] prose-strong:font-bold 
          prose-ul:list-disc prose-ol:list-decimal prose-li:text-[#062B4A]/80 prose-li:marker:text-[#A98B55]
          prose-blockquote:border-l-4 prose-blockquote:border-[#A98B55] prose-blockquote:bg-[#FAF9F6] prose-blockquote:p-6 prose-blockquote:italic prose-blockquote:text-[#062B4A]/70 prose-blockquote:rounded-r-2xl
          prose-img:rounded-3xl prose-img:shadow-2xl prose-img:my-12
          first-letter:text-7xl first-letter:font-bold first-letter:text-[#A98B55] first-letter:mr-3 first-letter:float-left first-letter:leading-none
          whitespace-pre-wrap text-[#062B4A] [&_*]:!text-[#062B4A]"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </section>

      {/* ═══ FOOTER CTA ═══ */}
      <section className="py-16 border-t border-[#062B4A]/10 bg-[#062B4A]/5 text-center px-6">
        <h3 className="text-2xl md:text-4xl font-medium text-[#062B4A] tracking-tight mb-6">Enjoyed this article?</h3>
        <p className="text-[#062B4A]/60 font-light max-w-lg mx-auto mb-10">Read more insights on our blog or get in touch with our team for expert real estate guidance.</p>
        <Link href="/blog" className="inline-flex items-center gap-4 bg-[#062B4A] text-white px-8 py-4 rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-[#A98B55] transition-colors duration-500">
          More Articles <ArrowRight size={14} />
        </Link>
      </section>
      
    </main>
  );
}
