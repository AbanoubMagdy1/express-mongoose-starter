import acl from 'acl';
const memoryBackend = new acl.memoryBackend();
const aclInstance = new acl(memoryBackend);

export default aclInstance;