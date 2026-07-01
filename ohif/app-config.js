window.config = {
  routerBasename: '/',

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
        qidoRoot: 'https://cardiograph.neuralsurge.ai/orthanc/dicom-web',
        wadoRoot: 'https://cardiograph.neuralsurge.ai/orthanc/dicom-web',
        wadoUriRoot: 'https://cardiograph.neuralsurge.ai/orthanc/wado',


        qidoSupportsIncludeField: true,
        imageRendering: 'wadors',
        thumbnailRendering: 'wadors',
      },
    },
  ],

  defaultDataSourceName: 'orthanc',
};