module.exports = {
  name: 'workspace-klm',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/workspace-klm/',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
