import { getBlog } from "../services/blog";
const blog=()=>{
    const  blogs=getBlog()
    return(
        <div>
            <h1>BLOGS</h1>
                <ul>
                    {blogs.map(blog=>(
                        <li key={blog.id}>{blog.content}</li>
                    ))}
                </ul>
        </div>
    )
}
export default blog