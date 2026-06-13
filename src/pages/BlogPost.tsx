import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogs } from '../data/blogs';

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const blog = blogs.find(b => b.id === id);

  if (!blog) {
    return (
      <div className="pt-32 px-margin-desktop text-center font-mono">
        <p className="text-syntax-purple mb-8 uppercase tracking-widest">[ 404_JOURNAL_NOT_FOUND ]</p>
        <Link to="/" className="text-syntax-blue hover:underline uppercase text-xs">Return to Workspace</Link>
      </div>
    );
  }

  return (
    <div className="pt-32 px-margin-desktop max-w-4xl mx-auto pb-40 font-mono text-text-main/90">
      <Link to="/" className="text-syntax-blue hover:underline flex items-center gap-2 mb-16 uppercase text-[10px] tracking-[0.3em] font-bold">
        <span className="material-symbols-outlined text-[18px]">terminal</span>
        Exit Journal
      </Link>
      
      <article className="space-y-16 animate-fade-in">
        <div className="space-y-6 border-l-2 border-syntax-purple pl-8">
          <div className="flex items-center gap-4 text-[10px] opacity-40 uppercase tracking-[0.4em] font-bold">
            <span>Research_Entry</span>
            <span className="h-px w-12 bg-border-glass"></span>
            <span>Ref: {blog.id}</span>
          </div>
          <h1 className="text-6xl font-bold text-text-main uppercase tracking-tighter leading-tight">{blog.title}</h1>
          <div className="flex gap-8 text-[11px] uppercase tracking-[0.2em] font-bold">
            <span className="text-syntax-purple">{blog.date}</span>
            <span className="text-text-main/30">//</span>
            <span className="text-syntax-blue">Topic: {blog.topic}</span>
          </div>
        </div>

        <div className="h-px bg-border-glass w-full"></div>

        <div className="prose prose-invert max-w-none space-y-8 text-lg leading-relaxed text-text-main/70">
           {blog.content.split('\n').map((line, i) => {
             const trimmed = line.trim();
             if (trimmed.startsWith('##')) {
               return <h2 key={i} className="text-2xl font-bold text-text-main uppercase tracking-widest mt-12 mb-6 border-b border-white/5 pb-2">{trimmed.replace('##', '').trim()}</h2>;
             }
             if (trimmed.length > 0) {
               return <p key={i} className="mb-6">{trimmed}</p>;
             }
             return null;
           })}
        </div>
      </article>
    </div>
  );
};

export default BlogPost;
