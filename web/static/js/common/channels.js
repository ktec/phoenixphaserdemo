// joinChannel :: Channel -> Channel
export const joinChannel = (channel, success, failure, timeout) => {
  channel
    .join()
    .receive("ok", success || joinOk)
    .receive("error", failure || joinError)
    .receive("timeout", timeout || joinTimeout)
  return channel
}

// joinOk :: Response -> Console
const joinOk = (response) => console.log(`Joined successfully`, response)

// joinError :: Response -> Console
const joinError = (response) => console.log(`Failed to join channel`, response)

// joinError :: Null -> Console
const joinTimeout = () => console.log("Networking issue. Still waiting...")
