import blogs from "../data/blog.json";

function getBlog(id) {
    return blogs.filter(blog => { return blog.id === parseInt(id) })[0];

}
function getFilteredPosts(posts, filter = { cat:'', tag:'', author:'' }) {
    var catgoryFilter = filter.cat !== undefined && filter.cat !== null && filter.cat !== '';
    var tagFilter = filter.tag !== undefined && filter.tag !== null && filter.tag !== '';
    var authorFilter = filter.author !== undefined && filter.author !== null && filter.author !== '';
    // Category filter
    if (catgoryFilter) {
        posts = posts.filter(post => {
            return (post.categories !== undefined && post.categories !== null) && post.categories.includes(parseInt(filter.cat))
        })
    }
    // Tag filter
    if (tagFilter) {
        posts = posts.filter(post => {
            return (post.tags !== undefined && post.tags !== null) && post.tags.includes(parseInt(filter.tag))
        })
    }
    // Author filter
    if (authorFilter) {
        posts = posts.filter(post => {
            return (post.author !== undefined && post.author !== null) && post.author.includes(parseInt(filter.author))
        })
    }

    return posts;
}

export { getBlog, getFilteredPosts };