var fs = require('fs');

module.exports = function (app, defaultHeaders = []) {
    var routes = [];
    var count = 0;

    app._router.stack.forEach(element => {
        let name = element.regexp.toString().replace('/^\\/', '').replace('\\/?(?=\\/|$)/i', '');
        let url = '';
        let method = '';

        if (name == '?(?=\\/|$)/i') return;

        // Create a folder for the requests of the route
        let folderId = 'fld_' + Math.random();
        routes.push({
            _id: folderId,
            parentId: 'wrk_1',
            name,
            _type: 'request_group'
        })

        if (element.handle.stack && element.handle.stack.length > 0) {
            element.handle.stack.forEach(stack => {
                url = stack.route.path;
                for (let [key, val] of Object.entries(stack.route.methods)) {
                    if (val == true) {
                        method = key;
                    }
                }

                // Generate the id for the Headers
                for (let i = 0; i < defaultHeaders.length; i++) {
                    defaultHeaders[i].id = 'pair_' + Math.random();
                }

                routes.push({
                    _id: `req_${++count}`,
                    parentId: folderId,
                    name: method,
                    method,
                    url: '{{ baseUrl }}/' + name + url,
                    headers: defaultHeaders,
                    _type: 'request'
                })
            })
        }

    });

    // Set workspace
    routes.push({
        _id: 'wrk_1',
        parentId: null,
        name: 'Routes',
        description: '',
        scope: null,
        _type: 'workspace'
    })

    fs.writeFileSync('routes.json', JSON.stringify({ _type: 'export', __export_format: 4, resources: routes }));
}