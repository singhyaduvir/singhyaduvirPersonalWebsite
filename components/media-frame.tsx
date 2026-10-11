import Image from "next/image";

type MediaFrameProps = {
  src: string | null;
  alt: string;
  pendingLabel: string;
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
  pendingLabel,
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
      ) : src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 960px, 100vw"
          className="object-cover"
          priority={priority}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-7">
          <div className="flex items-start justify-between gap-4 text-[11px] tracking-[0.16em] text-subtle uppercase">
            <span>Preview</span>
            <span>Image later</span>
          </div>
          <p className="font-serif text-3xl leading-none text-ink sm:text-4xl">
            {title}
          </p>
          <p className="max-w-xs text-sm text-muted">{pendingLabel}</p>
        </div>
      )}
    </div>
  );
}
