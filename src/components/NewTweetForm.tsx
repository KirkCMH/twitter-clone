import {
  FormEvent,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useSession } from "next-auth/react";
import { Button } from "./Button";
import { ProfileImg } from "./ProfileImg";
import { api } from "y/utils/api";

function updateTextAreaSize(textArea?: HTMLTextAreaElement) {
  if (textArea == null) return;
  textArea.style.height = "0";
  textArea.style.height = `${textArea.scrollHeight}px`;
}

function Form() {
  const session = useSession();
  const [inputValue, setInputValue] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>();
  const inputRef = useCallback((textArea: HTMLTextAreaElement) => {
    updateTextAreaSize(textArea);
    textAreaRef.current = textArea;
  }, []);

  useLayoutEffect(() => {
    updateTextAreaSize(textAreaRef.current);
  }, [inputValue]);

  const createTweet = api.tweet.create.useMutation({
    onSuccess: () => {
      setInputValue("");
    },
  });

  if (session.status !== "authenticated") return null;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    createTweet.mutate({ content: inputValue });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 border-b px-4 py-2"
    >
      <div className="flex gap-4">
        <ProfileImg src={session.data.user.image} />
        <textarea
          ref={inputRef}
          style={{
            height: "0",
          }}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-grow resize-none overflow-hidden p-4 text-lg outline-none"
          placeholder="What's happening?"
        ></textarea>
      </div>
      <Button className="self-end">Tweet</Button>
    </form>
  );
}

export function NewTweetForm() {
  const session = useSession();
  if (session.status !== "authenticated") return null;
  return <Form />;
}
