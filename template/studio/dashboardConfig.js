export default {
  widgets: [
    {
      name: 'sanity-tutorials',
      options: {
        templateRepoId: 'sanity-io/sanity-template-gridsome-blog'
      }
    },
    {name: 'structure-menu'},
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '5fc90e4ce379ab0e1d57059c',
                  title: 'Sanity Studio',
                  name: 'heavy-dev-sanity-gridsome-base-studio',
                  apiId: '2da3f745-3487-4282-951f-eb98e89d5894'
                },
                {
                  buildHookId: '5fc90e4c840e060d4af04903',
                  title: 'Blog Website',
                  name: 'heavy-dev-sanity-gridsome-base',
                  apiId: '6fe19f5d-5eaa-4513-9583-06f14dd5fcb8'
                },
                {
                  title: '[STAGING] Back-end',
                  apiId: '2da3f745-3487-4282-951f-eb98e89d5894',
                  buildHookId: '60065d62685d266e55d72805',
                  name: 'staging--heavy-dev-sanity-gridsome-base-studio'
                },
                {
                  title: '[STAGING] Front-end',
                  apiId: '6fe19f5d-5eaa-4513-9583-06f14dd5fcb8',
                  buildHookId: '60065d209d075275202e9daa',
                  name: 'staging--heavy-dev-sanity-gridsome-base'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/zacklerner/heavy-dev-sanity-gridsome-base',
            category: 'Code'
          },
          {title: 'Frontend', value: 'https://heavy-dev-sanity-gridsome-base.netlify.app', category: 'apps'}
        ]
      }
    },
    {name: 'project-users', layout: {height: 'auto'}},
    {
      name: 'document-list',
      options: {title: 'Recent blog posts', order: '_createdAt desc', types: ['post']},
      layout: {width: 'medium'}
    }
  ]
}
