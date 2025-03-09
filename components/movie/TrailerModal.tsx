import dynamic from "next/dynamic";

const Modal = dynamic(() => import("@/components/ui/Modal"), { ssr: false });

interface TrailerModalProps {
  trailerKey: string | null;
  onClose: () => void;
}

export default function TrailerModal({ trailerKey, onClose }: TrailerModalProps) {
  if (!trailerKey) return null;

  return (
    <Modal onClose={onClose}>
      <iframe
        width="100%"
        height="600"
        src={`https://www.youtube.com/embed/${trailerKey}`}
        allowFullScreen
        className="rounded-lg"
      />
    </Modal>
  );
}
