db.createUser({
    user: 'blog-node',
    pwd: 'blog-node',
    roles: [
        {
            role: 'readWrite',
            db: 'blog-node',
        },
    ],
});