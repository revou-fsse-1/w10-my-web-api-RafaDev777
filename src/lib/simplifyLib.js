const eventListenerSelect = (objId, eventType, execFunc) => {
  return document.querySelector(objId).addEventListener(eventType, execFunc);
};

export { eventListenerSelect };
