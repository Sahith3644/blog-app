const blog=[{
    id:1,content:"DAILY BLOGS",like:"100",title:"Hello"
},
{
    id:2,content:"BLOGS HELP TO MEMORIZE",like:"200",title:"Hello World"
}]
        let nextid=3

        export const getBlog=()=>{
            return blog
        }

        export const addBlog=(content:string,like:string,title:string)=>{
            blog.push({id:nextid++,content,like,title})
        }
