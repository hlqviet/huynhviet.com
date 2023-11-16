import { ComponentChildren } from "preact";

interface CardProps {
  children: ComponentChildren;
  class?: string;
}

const Card = (props: CardProps) => {
  const { children } = props;

  return (
    <div
      class={`p-4 rounded-lg bg-gray-200 hover:shadow transition ${
        props.class ?? ""
      }`}
    >
      {children}
    </div>
  );
};

export default Card;