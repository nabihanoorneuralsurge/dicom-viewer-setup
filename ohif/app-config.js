// window.config = {
//   // routerBasename: '/',
//   routerBasename: '/ohif',
//   extensions: [],
//   modes: [],
//   showStudyList: true,
//   dataSources: [
//     {
//       friendlyName: 'Orthanc',
//       namespace: '@ohif/extension-default.dataSourcesModule.dicomweb',
//       sourceName: 'orthanc',
//       configuration: {
//         name: 'orthanc',
//         qidoRoot: '/orthanc/dicom-web',
//         wadoRoot: '/orthanc/dicom-web',
//         wadoUriRoot: '/orthanc/wado',
//         qidoSupportsIncludeField: true,
//         imageRendering: 'wadors',
//         thumbnailRendering: 'wadors',
//       },
//     },
//   ],
//   defaultDataSourceName: 'orthanc',
// };
window.config = {
  routerBasename: '/ohif',

  extensions: [],
  modes: [],
  showStudyList: true,

  dataSources: [
    {
      friendlyName: 'Orthanc',
      namespace: '@ohif/extension-default.dataSourcesModule.dicomweb',
      sourceName: 'orthanc',

      configuration: {
        name: 'orthanc',

        qidoRoot: '/orthanc/dicom-web',
        wadoRoot: '/orthanc/dicom-web',
        wadoUriRoot: '/orthanc/wado',

        qidoSupportsIncludeField: true,
        imageRendering: 'wadors',
        thumbnailRendering: 'wadors',
      },
    },
  ],

  defaultDataSourceName: 'orthanc',
};