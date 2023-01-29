import React from 'react';
import { PostContent } from '../lib/posts';
import PostItem from './PostItem';
import TagLink from './TagLink';
import Pagination from './Pagination';
import { TagContent } from '../lib/tags';
import Image from 'next/image';
import Link from 'next/link';

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
    <div className="relative bg-c-off-white px-6 pt-16 pb-20 lg:px-8 lg:pt-24 lg:pb-28">
      <div className="absolute inset-0">
        <div className="h-1/3 bg-white sm:h-2/3" />
      </div>
      <div className="relative mx-auto max-w-7xl">
        <div className="text-left">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Business Resources</h2>
          <p className="mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4">
            Continue growing your business with our resources and insights.
          </p>
        </div>
        <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (

            <div key={post.title} className="flex flex-col overflow-hidden rounded-lg shadow-lg">
              <div className="flex-shrink-0">
                <a href={"/posts/" + post.slug} ><Image src={post.feature_image} alt="blog-feature" width={600} height={400} /></a>
              </div>
              <div className="flex flex-1 flex-col justify-between bg-white p-6">
                <div className="flex-1">
                  <div className="flex mb-4">
                    {tags.map((tag, i) => (
                      <Link key={`tag-${tag.slug}`} href={`/posts/tags/${tag.slug}`} className="text-xs text-white font-semibold mr-2 p-2 bg-c-yellow rounded-xl hover:bg-c-grey">
                        {tag.name}
                      </Link>
                    ))}
                  </div>

                  <p className="text-xl font-semibold text-gray-900"><a className='text-gray-900' href={"/posts/" + post.slug} >{post.title} </a></p>
                  {/* <p className="mt-3 text-base text-gray-500">{post.description}</p> */}
                </div>
              </div>
            </div>

          ))}
        </div>
      </div>
    </div>

  );
}
