
var feed = require('./feed');
var render = require('./render');

var colors = require('colors');
var moment = require('moment');

module.exports = function(data, liveReoad) {

    // templates may be changed
    var templates = require('./template')();

    // helper function
    var helper = {
        time: function(time, format) {
            return moment(time).format(format)
        },
        post: function(id) {
            return data.posts.filter(function(post) {
                return post.id == id
            })[0]
        }
    }

    if (!liveReoad) {
        // copy assets
        require('./assets')()

        // rss
        feed(data.posts)
    }

    // page posts
    if (templates.page) {
        data.pages.forEach(function(page) {
            render(page.path, templates.page, {page: page, helper: helper, data: data})
        })
    }

    // posts
    if (templates.post) {
        data.posts.forEach(function(post) {
            render(post.path, templates.post, {post: post, helper: helper, data: data})
        })
    }

    // categories
    if (templates.categories) {
        render('/categories/index.html', templates.categories, {categories: data.categories, helper: helper, data: data})
    }

    // tags
    if (templates.tags) {
        render('/tags/index.html', templates.tags, {tags: data.tags, helper: helper, data: data})
    }

    // index
    if (templates.index) {
        data.pager.index.forEach(function(index) {
            render(index.path, templates.index, {index: index, helper: helper, data: data})
        })
    }

    // archives
    if (templates.archives) {
        data.pager.archives.forEach(function(archives) {
            render(archives.path, templates.archives, {archives: archives, helper: helper, data: data})
        })
    }

    // category
    if (templates.category) {
        for (var category in data.pager.categories) {
            data.pager.categories[category].forEach(function(category) {
                render(category.path, templates.category, {category: category, helper: helper, data: data})
            })
        }
    }

    // tag
    if (templates.tag) {
        for (var tag in data.pager.tags) {
            data.pager.tags[tag].forEach(function(tag) {
                render(tag.path, templates.tag, {tag: tag, helper: helper, data: data})
            })
        }
    }

    console.log('INFO: '.blue +'success built html')

}