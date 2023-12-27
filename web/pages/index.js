import Map from '@/components/map'
import BlogCard from '../components/blogcard'
import Dropdown from '@/components/dropdown';
import { useEffect, useState } from 'react'

const Blogs = ({ users }) => {

  const [post, setPost] = useState([]);

  const [currentUser, setCurrentUser] = useState('')

  const fetchPost = async (username) => {
    try {
      if(!username) return setPost([])
      const res = await fetch(`${process.env.NEXT_PUBLIC_APP_API}/api/post/${username}`);
      const data = await res.json();

      if (data.success) {
        setPost(data.data)
      }else{
        setPost([])
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  useEffect(() => {
    setCurrentUser(users.data[0].username);
  }, [users]);

  useEffect(() => {
    fetchPost(currentUser);
  }, [currentUser]);


  console.log(post);


  return (
    <>
      <div className='flex items-center justify-center flex-col w-full'>
        <div className='lg:px-20 pt-10'>
          <Dropdown data={users?.data} currentUser={currentUser} setCurrentUser={setCurrentUser} />
        </div>
        <div className='flex flex-wrap lg:py-20 py-4 items-center lg:justify-between justify-center lg:mx-20'>
          {
            post && post.length > 0 ? post.map((elm,index) => (
              <BlogCard key={index} data={elm} />
            )): <div className='text-3xl text-slate-400'>No post found</div>
          }
        </div>
        <Map />
      </div>
    </>

  )
}

export default Blogs;

export async function getServerSideProps() {

  try {

    const res1 = await fetch(`${process.env.NEXT_PUBLIC_APP_API}/api/users`);

    const users = await res1.json();

    return {
      props: { users },
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
