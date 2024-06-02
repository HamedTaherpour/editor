// import { useState } from "react";
//
// interface Props {
//   keyboardClose: Function;
// }
//
// export const useKeyboard = (props: Props) => {
//   const { keyboardClose } = props;
//
//   const [keyboardHeight, setKeyboardHeight] = useState(400);
//   const [keyboardIsOpen, setKeyboardIsOpen] = useState(false);
//   let height = 0;
//   const viewport = window.visualViewport;
//   if (viewport)
//     height = viewport.height;
//
//   const onResize = (event: any) => {
//     if (!viewport)
//       return;
//     const h = Math.max(height - viewport.height, 0);
//     const isOpen = h > 1;
//     if (isOpen) {
//       var top = window.pageYOffset;
//       // setTimeout(function(){
//       // window.scrollTo(0,10);
//       // }, 100);
//       setKeyboardHeight(h);
//     }
//     setKeyboardIsOpen(isOpen);
//   };
//
//   function onScroll(e: TouchEvent) {
//     const target = e.target as HTMLElement;
//     if (target && !target.closest(".editor-toolbar-bottom")) {
//       keyboardClose();
//     }
//   }
//
//   if (viewport)
//     viewport.addEventListener("resize", onResize);
//   window.addEventListener("touchmove", onScroll);
//
//   return {
//     keyboardHeight, keyboardIsOpen
//   };
// };
//
// export const useEditorOptions = (options?: EditorOptions): EditorOptions => {
//
//   const defaultImageOptions: ImageEditorOptions = {
//     enabled: true
//   };
//   const defaultTextOptions: TextEditorOptions = {
//     enabled: true
//   };
//   const defaultH1Options: H1EditorOptions = {
//     enabled: true
//   };
//   const defaultH2Options: H2EditorOptions = {
//     enabled: true
//   };
//   const defaultH3Options: H3EditorOptions = {
//     enabled: true
//   };
//   const defaultQuoteOptions: QuoteEditorOptions = {
//     enabled: true
//   };
//   const defaultBulletOptions: BulletEditorOptions = {
//     enabled: true
//   };
//   const defaultBulletNumberOptions: BulletNumberEditorOptions = {
//     enabled: true
//   };
//   const defaultFileOptions: BulletNumberEditorOptions = {
//     enabled: true
//   };
//   const defaultVoiceOptions: VoiceEditorOptions = {
//     enabled: true
//   };
//   const defaultVideoOptions: VideoEditorOptions = {
//     enabled: true
//   };
//   const defaultDividerOptions: DividerEditorOptions = {
//     enabled: true
//   };
//
//   let imageOptions = defaultImageOptions;
//   if (options)
//     imageOptions = { ...defaultImageOptions, ...options.image };
//   let textOptions = defaultTextOptions;
//   if (options)
//     textOptions = { ...defaultTextOptions, ...options.text };
//   let h1Options = defaultH1Options;
//   if (options)
//     h1Options = { ...defaultH1Options, ...options.h1 };
//   let h2Options = defaultH2Options;
//   if (options)
//     h2Options = { ...defaultH2Options, ...options.h2 };
//   let h3Options = defaultH3Options;
//   if (options)
//     h3Options = { ...defaultH3Options, ...options.h3 };
//   let quoteOptions = defaultQuoteOptions;
//   if (options)
//     quoteOptions = { ...defaultQuoteOptions, ...options.quote };
//   let bulletOptions = defaultBulletOptions;
//   if (options)
//     bulletOptions = { ...defaultBulletOptions, ...options.bullet };
//   let bulletNumberOptions = defaultBulletNumberOptions;
//   if (options)
//     bulletNumberOptions = { ...defaultBulletNumberOptions, ...options.bulletNumber };
//   let fileOptions = defaultFileOptions;
//   if (options)
//     fileOptions = { ...defaultFileOptions, ...options.file };
//   let voiceOptions = defaultVoiceOptions;
//   if (options)
//     voiceOptions = { ...defaultVoiceOptions, ...options.voice };
//   let videoOptions = defaultVideoOptions;
//   if (options)
//     videoOptions = { ...defaultVideoOptions, ...options.video };
//   let dividerOptions = defaultDividerOptions;
//   if (options)
//     dividerOptions = { ...defaultDividerOptions, ...options.divider };
//
//   const finalOptions: EditorOptions = {
//     image: imageOptions,
//     text: textOptions,
//     h1: h1Options,
//     h2: h2Options,
//     h3: h3Options,
//     quote: quoteOptions,
//     bullet: bulletOptions,
//     bulletNumber: bulletNumberOptions,
//     file: fileOptions,
//     voice: voiceOptions,
//     video: videoOptions,
//     divider: dividerOptions
//   };
//
//   return finalOptions;
// };