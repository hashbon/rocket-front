import React from "react";

export const ucfirst: any = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

export const nl2br = (text: string) =>
  text.split("\\n").map((item: string, i: number) => {
    const nl2brKey = `nl2brKey${i}`;
    return (
      <span key={nl2brKey}>
        {item}
        <br />
      </span>
    );
  });
