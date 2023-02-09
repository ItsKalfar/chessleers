import { toast } from "react-hot-toast";

export const readStream = (name, response, handler) => {
  const stream = response.body.getReader();
  const matcher = /\r?\n/;
  const decoder = new TextDecoder();
  let buf = "";

  const process = (json) => {
    const msg = JSON.parse(json);
    toast.success(name, msg);
    handler(msg);
  };

  const loop = () => {
    stream.read().then(({ data, value }) => {
      if (done) {
        if (buf.length > 0) process(buf);
        return;
      } else {
        const chunk = decoder.decode(value, {
          stream: true,
        });
        buf += chunk;

        const parts = buf.split(matcher);
        buf = parts.pop() || "";
        for (const i of parts.filter((p) => p)) process(i);
        return loop();
      }
    });
  };

  return {
    closePromise: loop(),
    close: () => stream.cancel(),
  };
};
