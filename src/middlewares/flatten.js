function flattenArray(obj) {
  return obj.map((e) => flatten(e));
}

function flattenData(obj) {
  return flatten(obj.data);
}

function flattenAttrs(obj) {
  let attrs = {};
  for (var key in obj.attributes) {
    attrs[key] = flatten(obj.attributes[key]);
  }
  return {
    id: obj.id,
    ...attrs,
  };
}

function flatten(obj) {
  if (Array.isArray(obj)) {
    return flattenArray(obj);
  }
  if (obj && obj.data) {
    return flattenData(obj);
  }
  if (obj && obj.attributes) {
    return flattenAttrs(obj);
  }
  for (var k in obj) {
    if (typeof obj[k] == "object") {
      obj[k] = flatten(obj[k]);
    }
  }
  return obj;
}

async function respond(ctx, next) {
  await next();
  if (!ctx.url.startsWith("/api")) {
    return;
  }
  ctx.response.body = flatten(ctx.response.body.data);
}

module.exports = () => respond;
