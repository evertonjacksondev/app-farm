import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Agriculture } from "../components/pages/Agriculture";
import { NavBar } from "../components/template/NavBar";
import { Farm } from "../components/pages/Farm";
import { Produtor } from "../components/pages/Produtor";


export const Router = () => {

    return (
        <BrowserRouter >
            <Routes>
                <Route element={<NavBar />}>
                    <Route path="*" element={<Produtor />} />
                    <Route path="/agriculture" element={<Agriculture />} />
                    <Route path="/produtor" element={<Produtor />} />
                    <Route path="/farm" element={<Farm />} />

                </Route>
            </Routes>
        </BrowserRouter >
    )
}