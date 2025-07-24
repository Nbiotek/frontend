import { useState, useRef, SyntheticEvent, MouseEvent, useEffect } from 'react';
import { GoScreenFull } from 'react-icons/go';
import { calculateTime, calculateTimeStr } from '@/utils/time';
import { pauseOtherMedia } from '@/utils/media';
import { FaPause, FaPlay } from 'react-icons/fa';
import { TbRewindForward10, TbRewindBackward10 } from 'react-icons/tb';
import { ClipLoader } from 'react-spinners';

interface IVideoPlayerProps {
  src: string | null;
  isPreview?: boolean;
  showDuration?: boolean;
  hideFullScreen?: boolean;
}

const VideoPlayer = ({ src, isPreview, showDuration, hideFullScreen }: IVideoPlayerProps) => {
  const [current, setCurrent] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const bufferRef = useRef<HTMLDivElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);
  const [srcLoading, setSRCLoading] = useState<boolean>(true);

  const videoEl = videoRef.current;
  const progressEl = progressRef.current;
  const bufferEl = bufferRef.current;

  if (videoEl) {
    videoEl;
  }

  // play/pause Func
  const videoPlayPauseFn = () => {
    if (videoEl) {
      if (videoEl?.paused) {
        videoEl?.play();
      } else {
        videoEl?.pause();
      }
    }
  };

  // fwd Func
  const videoFwdFn = () => {
    if (videoEl) {
      videoEl.currentTime += 10;
    }
  };

  // bwd Func
  const videoBwdFn = () => {
    const videoEl = videoRef.current;

    if (videoEl) {
      videoEl.currentTime -= 10;
    }
  };

  // set onPlay and onPlaying
  const handleOnPlay = () => {
    if (srcLoading) setSRCLoading(false);
    setIsPlaying(true);
    if (videoEl) pauseOtherMedia(videoEl);
  };

  // set onPlay and onPlaying
  const handleOnPause = () => {
    if (srcLoading) setSRCLoading(false);
    setIsPlaying(false);
  };

  // onWaiting
  const handleOnWaiting = () => {
    if (isPlaying) setIsPlaying(false);
    setSRCLoading(true);
  };

  // seeker
  const handleSeeker = (event: MouseEvent<HTMLDivElement>) => {
    if (!videoEl) return;
    const { left, width } = event.currentTarget.getBoundingClientRect();
    const clickPos = (event.clientX - left) / width;

    if (clickPos < 0 || clickPos > 1) return;
    const durationMs = videoEl.duration * 1000;
    const newElapsedTime = durationMs * clickPos;
    const newTimeSec = newElapsedTime / 1000;
    videoEl.currentTime = newTimeSec;
    setCurrent(newTimeSec);
  };

  // onloadedmetadata
  const handleOnLoadedMetadata = (event: SyntheticEvent<HTMLVideoElement>) => {
    const target = event.currentTarget;
    if (target.readyState > 0) {
      setDuration(target.duration);
      setSRCLoading(false);
    } else {
      setDuration(event.currentTarget.duration);
    }
  };

  // ontimeupdate
  const handleonTimeupdate = (event: SyntheticEvent<HTMLVideoElement>) => {
    if (srcLoading) setSRCLoading(false);
    if (progressEl) {
      const { currentTime, duration } = event.currentTarget;
      setCurrent(currentTime);
      const progress = currentTime / duration;
      const width = progress * 100;
      progressEl.style.width = `${width}%`;
    }
  };

  // onprogress
  const handleOnProgress = (event: SyntheticEvent<HTMLVideoElement>) => {
    const { buffered, duration } = event.currentTarget;
    if (buffered.length) {
      const bufferEnd = buffered.end(buffered.length - 1);

      if (bufferEl && duration > 0) {
        const progress = bufferEnd / duration;
        const width = progress * 100;
        bufferEl.style.width = `${width}%`;
      }
    } else return;
  };

  // handle media fullscreen toggle
  const toggleFullscreen = () => {
    if (videoEl) {
      if (!document.fullscreenElement) {
        videoEl.requestFullscreen().catch((err) => {
          console.error(`Error attempting to enable fullscreen mode: ${err.message} (${err.name})`);
        });
      } else {
        document.exitFullscreen();
      }
    }
  };

  // pause all media when not in user view.
  useEffect(() => {
    const handleVisibilityChange = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting && !videoEl?.paused) {
          videoEl?.pause();
        }
      });
    };

    const observer = new IntersectionObserver(handleVisibilityChange, { threshold: 0.5 });
    if (videoEl) {
      observer.observe(videoEl);
    }

    return () => {
      if (videoEl) {
        observer.unobserve(videoEl);
      }
    };
  }, [videoEl]);

  return (
    <figure className="group relative h-full w-full transition-all duration-150 ease-in-out">
      {hideFullScreen ? null : (
        <div
          className="from-slate-50 to-zinc-900 absolute left-2 top-2 z-10 w-fit cursor-pointer bg-gradient-to-t text-xl text-white"
          onClick={toggleFullscreen}
        >
          <GoScreenFull className="cursor-pointer" />
        </div>
      )}

      {!srcLoading ? (
        showDuration ? (
          <div className="absolute bottom-2 right-2 rounded-full bg-black px-2 py-1 text-xs text-white">
            {calculateTimeStr(duration)}
          </div>
        ) : null
      ) : null}
      <div className="absolute left-[50%] top-[50%] z-10 flex h-full w-full -translate-x-[50%] -translate-y-[50%] items-center justify-center space-x-2 transition-all duration-150 ease-in-out">
        {srcLoading ? (
          <ClipLoader color="#D9D9D9" size={20} />
        ) : (
          <div className="flex items-center justify-center space-x-2">
            <div
              onClick={videoBwdFn}
              className={`ease h-7 w-7 cursor-pointer items-center  justify-center rounded-full bg-black/70 bg-opacity-80 bg-clip-padding shadow backdrop-blur-md backdrop-filter transition-all duration-75 hover:border hover:border-white ${
                isPreview ? 'hidden' : 'hidden group-hover:flex'
              }`}
            >
              <TbRewindBackward10 className="ease text-white transition-all duration-75" />
            </div>
            <div
              onClick={videoPlayPauseFn}
              className={`ease rounded-full bg-black/70 bg-opacity-80 bg-clip-padding text-black shadow backdrop-blur-md backdrop-filter transition-all duration-75 hover:border hover:border-white
              ${
                isPreview ? 'text-sm ' : 'hidden group-hover:flex'
              } flex h-7 w-7 cursor-pointer items-center justify-center rounded-full`}
            >
              {!isPlaying ? (
                <FaPlay className="ease text-white transition-all duration-75" />
              ) : (
                <FaPause className="ease text-white transition-all duration-75" />
              )}
            </div>
            <div
              onClick={videoFwdFn}
              className={`ease flex h-7 w-7 cursor-pointer  items-center justify-center rounded-full bg-black/70 bg-opacity-80 bg-clip-padding shadow backdrop-blur-md backdrop-filter transition-all duration-75 hover:border hover:border-white ${
                isPreview ? 'hidden' : 'hidden group-hover:flex'
              }`}
            >
              <TbRewindForward10 className="duration-175ease text-white transition-all" />
            </div>
          </div>
        )}
      </div>

      {src && (
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          preload="metadata"
          onPlay={handleOnPlay}
          onPlaying={handleOnPlay}
          onPause={handleOnPause}
          onWaiting={handleOnWaiting}
          onLoadedMetadata={handleOnLoadedMetadata}
          onProgress={handleOnProgress}
          onTimeUpdate={handleonTimeupdate}
          src={src}
        />
      )}

      {isPreview ? null : (
        <div className="absolute bottom-0 left-[50%] z-10 hidden h-[40px] w-full -translate-x-[50%] bg-gradient-to-t from-black text-white transition-all duration-150 ease-in-out group-hover:flex">
          <div className="flex h-full w-full flex-col items-center justify-center space-y-2">
            <div
              className="relative h-[3px] w-[95%] cursor-pointer overflow-clip rounded bg-neutral-50"
              onClick={handleSeeker}
            >
              <div ref={progressRef} className="absolute z-20 h-full bg-primary"></div>
              <div ref={bufferRef} className="absolute z-10 h-full bg-white"></div>
            </div>
            <div className="mt-1 flex w-[95%] items-center justify-between text-[8px]">
              <p>{calculateTime(current)}</p>
              <p>{calculateTime(duration)}</p>
            </div>
          </div>
        </div>
      )}
    </figure>
  );
};

export default VideoPlayer;
