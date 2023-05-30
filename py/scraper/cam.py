## media
#https://pytorch.org/ "live" fish vs. shrimp feed, "bots" framework for tasks/items with tagged fish swarm theory using live feeds with depth, object detection, text/image recognition
import cv2
from av import VideoFrame
from aiortc import MediaStreamTrack, RTCPeerConnection, RTCSessionDescription
from aiortc.contrib.media import MediaBlackhole, MediaPlayer, MediaRecorder

#ROOT = os.path.dirname(__file__)
pcs = set()

class VideoTransformTrack(MediaStreamTrack):
    kind = "video"

    def __init__(self, track):
        super().__init__()  # don't forget this!
        self.track = track
        #self.transform = transform

    async def recv(self):
        frame = await self.track.recv()

#        if self.transform == "cartoon":
        img = frame.to_ndarray(format="bgr24")
        img_color = cv2.pyrDown(cv2.pyrDown(img))
        for _ in range(6):
            img_color = cv2.bilateralFilter(img_color, 9, 9, 7)
            
        img_color = cv2.pyrUp(cv2.pyrUp(img_color))
        img_edges = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)
        img_edges = cv2.adaptiveThreshold(cv2.medianBlur(img_edges, 7),255,cv2.ADAPTIVE_THRESH_MEAN_C,cv2.THRESH_BINARY,9,2,)
        img_edges = cv2.cvtColor(img_edges, cv2.COLOR_GRAY2RGB)
        img = cv2.bitwise_and(img_color, img_edges)
        new_frame = VideoFrame.from_ndarray(img, format="bgr24")
        new_frame.pts = frame.pts
        new_frame.time_base = frame.time_base
        return new_frame
#        elif self.transform == "edges":
#            img = frame.to_ndarray(format="bgr24")
#            img = cv2.cvtColor(cv2.Canny(img, 100, 200), cv2.COLOR_GRAY2BGR)
#            new_frame = VideoFrame.from_ndarray(img, format="bgr24")
#            new_frame.pts = frame.pts
#            new_frame.time_base = frame.time_base
#            return new_frame
#        else:
#            return frame

async def media(request):
    print ("offer")
    params = await request.json()
    offer = RTCSessionDescription(sdp=params["sdp"], type=params["type"])

    pc = RTCPeerConnection()
    pc_id = "PeerConnection(%s)" % uuid.uuid4()
    pcs.add(pc)

    #player = MediaPlayer(os.path.join(REL, "demo-instruct.wav"))
    #if args.write_audio:
    #    recorder = MediaRecorder(args.write_audio)
    #else:
    recorder = MediaBlackhole()
    print ("created")
    @pc.on("datachannel")
    def on_datachannel(channel):
        @channel.on("message")
        def on_message(message):
            if isinstance(message, str) and message.startswith("ping"):
                print("message")
                channel.send("pong" + message[4:])

    @pc.on("iceconnectionstatechange")
    async def on_iceconnectionstatechange():
        if pc.iceConnectionState == "failed":
            print("failed")
            await pc.close()
            pcs.discard(pc)

    @pc.on("track")
    def on_track(track):
        if track.kind == "audio":
            print ("audio")
            #pc.addTrack(player.audio)
            recorder.addTrack(track)
        elif track.kind == "video":
            print ("video")
            local_video = VideoTransformTrack(track)
            pc.addTrack(local_video)

        @track.on("ended")
        async def on_ended():
            await recorder.stop()

    await pc.setRemoteDescription(offer)
    await recorder.start()
    print ("process")
    answer = await pc.createAnswer()
    await pc.setLocalDescription(answer)
    print("done")
    return web.Response(content_type="application/json", text=json.dumps({"sdp": pc.localDescription.sdp, "type": pc.localDescription.type}),)

async def on_shutdown(app):
    coros = [pc.close() for pc in pcs]
    await asyncio.gather(*coros)
    pcs.clear() 
