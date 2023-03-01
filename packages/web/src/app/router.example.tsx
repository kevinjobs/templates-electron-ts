import React from 'react';
import {Routes, Route } from "react-router-dom";
import NotFound from "@pages/not-found";
import Gerer from '@pages/perer';

export default function RouterExample() {
  return (
    <Routes>
      <Route element={<Gerer />} path={'*'} />
      <Route element={<NotFound />} path={"*"} />
    </Routes>
  )
}