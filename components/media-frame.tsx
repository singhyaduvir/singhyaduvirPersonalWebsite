import Image from "next/image";

type MediaFrameProps = {
  src: string;
  alt: string;
  title: string;
  className?: string;
  priority?: boolean;
  aspect?: "wide" | "photo" | "tall" | "square" | "landscape";
  video?: {
    src: string;
    type: string;
    poster?: string | null;
    zoom?: boolean;
  };
};

const aspectClass = {
  wide: "aspect-[16/9]",
  photo: "aspect-[4/3]",
  tall: "aspect-[4/5]",
  square: "aspect-square",
  landscape: "aspect-[3/2]",
};

export function MediaFrame({
  src,
  alt,
  title,
  className = "",
  priority = false,
  aspect = "wide",
  video,
}: MediaFrameProps) {
  return (
    <div
      className={`relative overflow-hidden border border-border bg-[#ecece8] ${aspectClass[aspect]} ${className}`}
    >
      {video ? (
        <video
          className={`absolute inset-0 h-full w-full object-cover ${video.zoom ? "scale-[1.1]" : ""}`}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster={video.poster ?? src ?? undefined}
          aria-label={`${title} video preview`}
        >
          <source src={video.src} type={video.type} />
        </video>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 960px, 100vw"
          className="object-cover"
          priority={priority}
        />
      )}
    </div>
  );
}
