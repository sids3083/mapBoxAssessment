import React, { useEffect, useState } from 'react'

const blogSingle = ({ blog, id }) => {
  const data = blog?.data;

  const [content, setContent] = useState('');
  const [comments, setComments] = useState([])

  // handle on submit
  const handleOnSubmit = (e, user_id, post_id) => {

    e.preventDefault();

    fetch(`${process.env.NEXT_PUBLIC_APP_API}/api/comment`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ content, user_id, post_id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setContent('');
          fetchComments(id);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  // fetch comments
  const fetchComments = async (id) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_APP_API}/api/comments/${id}`);
      const data = await res.json();

      if (data.success) {
        setComments(data.data)
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // fetch comments
  useEffect(() => {
    fetchComments(id);
  }, [id]);




  return (

    <React.Fragment>

      <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased">
        <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
          <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
            <header className="mb-4 lg:mb-6 not-format">
              <address className="flex items-center mb-6 not-italic">
                <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                  <div>
                    <a href="#" rel="author" className="text-xl font-bold text-gray-900 dark:text-white">By: {" "}Jese Leos</a>
                    <p className="text-base text-gray-500 dark:text-gray-400"><time pubdate datetime="2022-02-08" title="February 8th, 2022">{new Date(data?.created_at).toDateString()}</time></p>
                  </div>
                </div>
              </address>
              <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">Best practices for successful prototypes</h1>
            </header>

            <figure><img src={`${process.env.NEXT_PUBLIC_APP_API}/${data?.image}`} alt="" />
              <figcaption>{data?.title}</figcaption>
            </figure>
            <p>{data?.content}</p>


            <section className="not-format py-12">

              <form className="mb-6" onSubmit={(e) => handleOnSubmit(e, data?.user_id, data?.id)}>
                <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                  <label htmlFor="comment" className="sr-only">Your comment</label>
                  <textarea id="comment" rows="6"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                    placeholder="Write a comment..." required></textarea>
                </div>
                <button type="submit"
                  className="bg-white inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-black bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                  Post comment
                </button>
              </form>
              <h2 className="mb-4 text-2xl font-bold leading-tight text-gray-900 lg:mb-6 lg:text-3xl dark:text-white">Comments ({comments.length + 1})</h2>
              {
                comments && comments.length > 0 && comments.reverse().map((comment, index) => (
                  <article key={index} className="p-6 mb-6 text-base bg-white border-t border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                    <footer className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <p className="text-sm text-gray-600 dark:text-gray-400"><time
                          title="March 12th, 2022">{new Date(comment?.created_at).toDateString()}</time></p>
                      </div>
                    </footer>

                    <p>{comment.content}</p>
                  </article>
                ))
              }


            </section>
          </article>
        </div>
      </main>


    </React.Fragment>
  )
}

export default blogSingle;

// getServerSideProps
export async function getServerSideProps(context) {
  const { params } = context;
  const { id } = params;
  try {
    // Fetch data from external API
    const res1 = await fetch(`${process.env.NEXT_PUBLIC_APP_API}/api/post/single/${id}`);
    const blog = await res1.json();

    return {
      props: { blog, id },
    };

  } catch (error) {
    console.error('Error fetching data:', error);

    return {
      props: {
        data: [],
      },
    };
  }

}