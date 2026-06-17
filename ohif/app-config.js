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
        qidoRoot: 'http://localhost:9042/dicom-web',
        wadoRoot: 'http://localhost:9042/dicom-web',
        wadoUriRoot: 'http://localhost:9042/wado',
        qidoSupportsIncludeField: true,
        imageRendering: 'wadors',
        thumbnailRendering: 'wadors',
      },
    },
  ],
  defaultDataSourceName: 'orthanc',
};