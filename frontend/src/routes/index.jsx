import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cataloguer from "../pages/Cataloguer";

export default function RoutesApp() {
    return (
        <BrowserRouter>
            <Fragment>
                <Routes>
                    <Route exact path="/teste" element={<Cataloguer />} />
                </Routes>
            </Fragment>
        </BrowserRouter>
    )
}