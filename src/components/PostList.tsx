import React from 'react';
import { PostContent } from '../lib/posts';
import PostItem from './PostItem';
import TagLink from './TagLink';
import Pagination from './Pagination';
import { TagContent } from '../lib/tags';
import Image from 'next/image';

type Props = {
  posts: PostContent[];
  tags: TagContent[];
  pagination: {
    current: number;
    pages: number;
  };
};
export default function PostList({ posts, tags, pagination }: Props) {
  return (
    // <div className={'container py-8'}>
    //   <ul className={'categories'}>
    //     {tags.map((it, i) => (
    //       <li key={i}>
    //         <TagLink tag={it} />
    //       </li>
    //     ))}
    //   </ul>
    //   <div className={'posts'}>
    //     <ul className={'post-list'}>
    //       {posts.map((it, i) => (
    //         <li key={i}>
    //           <PostItem post={it} />
    //         </li>
    //       ))}
    //     </ul>
    //     <Pagination
    //       current={pagination.current}
    //       pages={pagination.pages}
    //       link={{
    //         href: (page) =>
    //           page === 1 ? '/posts' : '/posts/page/[page]',
    //         as: (page) => (page === 1 ? null : '/posts/page/' + page),
    //       }}
    //     />
    //   </div>
    // </div>
    <div className="relative bg-c-off-white px-6 pt-16 pb-20 lg:px-8 lg:pt-24 lg:pb-28">
      <div className="absolute inset-0">
        <div className="h-1/3 bg-white sm:h-2/3" />
      </div>
      <div className="relative mx-auto max-w-7xl">
        <div className="text-left">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"> Building Business</h2>
          <p className="mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4">
            Continue growing your Bussiness reading our resources and insights.
          </p>
        </div>
        <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <a href={"/posts/" + post.slug} >
              <div key={post.title} className="flex flex-col overflow-hidden rounded-lg shadow-lg">
                <div className="flex-shrink-0">
                  <Image src={post.feature_image} alt="blog-feature" width={600} height={400} />
                </div>
                <div className="flex flex-1 flex-col justify-between bg-white p-6">
                  <div className="flex-1">
                    <div className="flex mb-4">
                      {tags.map((tag, i) => (
                        <a key={`tag-${tag.slug}`} href={`/posts/tags/${tag.slug}`} className="text-xs text-white mr-2 p-2 bg-c-yellow rounded-xl hover:opacity-75">
                          {tag.name}
                        </a>
                      ))}
                    </div>

                    <p className="text-xl font-semibold text-gray-900">{post.title}</p>
                    {/* <p className="mt-3 text-base text-gray-500">{post.description}</p> */}

                  </div>
                  {/* <div className="mt-6 flex items-center">
                  <div className="flex-shrink-0">
                    <a href={post.author.href}>
                      <span className="sr-only">{post.author.name}</span>
                      <img className="h-10 w-10 rounded-full" src={post.author.imageUrl} alt="" />
                    </a>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      <a href={post.author.href} className="hover:underline">
                        {post.author.name}
                      </a>
                    </p>
                    <div className="flex space-x-1 text-sm text-gray-500">
                      <time dateTime={post.datetime}>{post.date}</time>
                      <span aria-hidden="true">&middot;</span>
                      <span>{post.readingTime} read</span>
                    </div>
                  </div>
                </div> */}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>

  );
}
