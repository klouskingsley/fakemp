export default function toResult(msg, data, command) {
  var obj = {
    ext: data,
    msg: msg
  }
  if (command) obj.command = command
  return obj
}
