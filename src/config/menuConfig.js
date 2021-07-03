const sideMenu = [
          {
              icon: 'el-icon-s-home',
              index: '/homePage',
              title: '系统首页'
          },
          {
            icon: 'el-icon-s-custom',
            index: '/role',    
            title: '角色控制'
          },
          {
              icon: 'el-icon-menu',
              index: '/table',
              title: '基础表格'
          },
          {
              icon: 'el-icon-document-copy',
              index: '/tabs',
              title: 'tab选项卡'
          },
          {
              icon: 'el-icon-menu',
              index: '3',
              title: '表单相关',
              subs: [
                  {
                      index: '/form',
                      title: '基本表单'
                  },
                  {
                      index: '3-2',
                      title: '三级菜单',
                      subs: [
                          {
                              index: '/editor',
                              title: '富文本编辑器'
                          },
                          {
                              index: '/markdown',
                              title: 'markdown编辑器'
                          }
                      ]
                  },
                  {
                      index: '/upload',
                      title: '文件上传'
                  }
              ]
          },
          {
              icon: 'el-icon-pie-chart',
              index: '/eCharts',
              title: 'eCharts图表'
          },
          {
              icon: 'el-icon-rank',
              index: '6',
              title: '拖拽组件',
              subs: [
                  {
                      index: '/drag',
                      title: '拖拽列表'
                  },
                  {
                      index: '/dialog',
                      title: '拖拽弹框'
                  }
              ]
          },
          {
              icon: 'el-icon-place',
              index: '/i18n',
              title: '国际化功能'
          },
          {
              icon: 'el-icon-warning-outline',
              index: '7',
              title: '错误处理',
              subs: [
                  {
                      index: '/permission',
                      title: '权限测试'
                  },
                  {
                      index: '/404',
                      title: '404页面'
                  }
              ]
          },
          {
              icon: 'el-icon-help',
              index: '/donate',
              title: '支持作者'
          }
      ]
export default sideMenu; // 导出管理员权限菜单

// 导出普通权限菜单
export const commonSideMenu = [
  {
    icon: 'el-icon-s-home',
    index: '/homePage',
    title: '系统首页'
  },
  {
    icon: 'el-icon-menu',
    index: '/table',
    title: '基础表格'
  },
  {
    icon: 'el-icon-document-copy',
    index: '/tabs',
    title: 'tab选项卡'
  },
  {
    icon: 'el-icon-menu',
    index: '3',
    title: '表单相关',
    subs: [
      {
        index: '/form',
        title: '基本表单'
      },
      {
        index: '3-2',
        title: '三级菜单',
        subs: [
          {
            index: '/editor',
            title: '富文本编辑器'
          },
          {
            index: '/markdown',
            title: 'markdown编辑器'
          }
        ]
      },
      {
        index: '/upload',
        title: '文件上传'
      }
    ]
  },
  {
    icon: 'el-icon-pie-chart',
    index: '/eCharts',
    title: 'echart图表',
  },
  {
    icon: 'el-icon-rank',
    index: '6',
    title: '拖拽组件',
    subs: [
      {
        index: '/drag',
        title: '拖拽列表'
      },
      {
        index: '/dialog',
        title: '拖拽弹框'
      }
    ]
  },
  {
    icon: 'el-icon-place',
    index: '/i18n',
    title: '国际化功能'
  },
  {
    icon: 'el-icon-warning-outline',
    index: '7',
    title: '错误处理',
    subs: [
      {
        index: '/permission',
        title: '权限测试'
      },
      {
        index: '/404',
        title: '404页面'
      }
    ]
  },
  {
    icon: 'el-icon-help',
    index: '/donate',
    title: '支持作者'
  }
]

