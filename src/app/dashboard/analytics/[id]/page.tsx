import VideoStats from "@/components/video-stats";

interface pageProps {}

export default function page() {
  return (
    <div className="flex justify-center items-center pt-16 px-6">
      {/* <video width="750" height="500" controls>
        <source src="./Videos/video1.mp4" type="video/mp4" />
      </video> */}
      <VideoStats />
    </div>
  );
}
