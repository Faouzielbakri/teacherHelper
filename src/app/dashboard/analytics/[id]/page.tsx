import VideoStats from "@/components/video-stats";

interface pageProps {}

export default function page() {
  return (
    <div className="flex justify-center items-center pt-16 px-6">
      <VideoStats />
    </div>
  );
}
