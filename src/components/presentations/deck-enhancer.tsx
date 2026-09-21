"use client";
import { useEffect } from "react";
import { mountPresentation } from "./hrlink-sdlc/controller";
/** Клиентский остров: статические слайды остаются серверными компонентами. */
export function DeckEnhancer() {
    useEffect(() => mountPresentation(), []);
    return null;
}
