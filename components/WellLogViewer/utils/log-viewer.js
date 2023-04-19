import { isScaleTrack } from "../utils/tracks";
export function removeOverlay(logViewer) {
    logViewer.container.select(".overlay").remove();
    //logViewer.overlay = null;
}
export function isTrackVisible(track) {
    if (track.elm) {
        const elm = track.elm.parentElement;
        if (elm) {
            return elm.style.display !== "none";
        }
    }
    return false;
}
export function showTrack(track, visible) {
    if (track.elm) {
        const elm = track.elm.parentElement;
        if (elm) {
            const display = visible ? "flex" : "none";
            if (elm.style.display !== display) {
                elm.style.display = display;
                return true; // visibility is changed
            }
        }
    }
    return false; // visibility is not changed
}
export function isTrackSelected(_logViewer, track) {
    if (track.elm) {
        const elm = track.elm.parentElement;
        if (elm) {
            return elm.classList.contains("selected");
        }
    }
    return false;
}
export function selectTrack(logViewer, track, selected) {
    if (track.elm) {
        const elm = track.elm.parentElement;
        if (elm) {
            if (isTrackSelected(logViewer, track) !== selected) {
                elm.classList.toggle("selected");
                return true; // selection is changed
            }
        }
    }
    return false; // selection is not changed
}
export function getSelectedTrackIndices(logViewer) {
    const selectedTrackIndices = [];
    if (logViewer) {
        let iTrack = 0;
        for (const track of logViewer.tracks) {
            if (isTrackSelected(logViewer, track))
                selectedTrackIndices.push(iTrack);
            iTrack++;
        }
    }
    return selectedTrackIndices;
}
///////////////////////
export function zoomContent(logViewer, zoom) {
    if (!zoom)
        zoom = 1.0;
    const [b1, b2] = logViewer.scaleHandler.baseDomain();
    const [d1, d2] = logViewer.domain;
    const currentZoom = Math.abs(b2 - b1) / Math.abs(d2 - d1);
    // see also: getContentZoom(logViewer);
    const f = Math.abs(Math.log(currentZoom / zoom));
    if (f > 0.01) {
        /*currentZoom !~= zoom*/
        let d = (d2 - d1) * 0.5;
        let c = d1 + d; // the center of the visible part
        d = d * (currentZoom / zoom);
        // check if new domain is in the base domain
        if (c + d > b2)
            c = b2 - d;
        if (c - d < b1)
            c = b1 + d;
        logViewer.zoomTo([c - d, c + d]);
        return true;
    }
    return false;
}
export function scrollContentTo(logViewer, f) {
    const [b1, b2] = logViewer.scaleHandler.baseDomain();
    const [d1, d2] = logViewer.domain;
    const d = d2 - d1;
    const w = b2 - b1 - d; // width of not visible part of content
    const c = b1 + f * w;
    if (c !== d1) {
        logViewer.zoomTo([c, c + d]);
        return true;
    }
    return false;
}
export function zoomContentTo(logViewer, domain) {
    const [d1, d2] = logViewer.domain;
    if (domain[0] !== d1 || domain[1] !== d2) {
        logViewer.zoomTo(domain);
        return true;
    }
    return false;
}
export function setContentBaseDomain(logViewer, domain) {
    const [b1, b2] = logViewer.scaleHandler.baseDomain();
    if (b1 !== domain[0] || b2 !== domain[1]) {
        logViewer.domain = domain;
        //logViewer.scaleHandler.baseDomain(domain);
        //logViewer.rescale();
    }
}
////////// utilities
export function getContentBaseDomain(logViewer) {
    const [b1, b2] = logViewer.scaleHandler.baseDomain();
    return [b1, b2];
}
export function getContentDomain(logViewer) {
    const [d1, d2] = logViewer.domain;
    return [d1, d2];
}
export function getContentZoom(logViewer) {
    // see also zoomContent(logViewer)
    const [b1, b2] = logViewer.scaleHandler.baseDomain();
    const [d1, d2] = logViewer.domain;
    return Math.abs(b2 - b1) / Math.abs(d2 - d1);
}
export function scrollTracksTo(logViewer, iFrom, iTo) {
    let visibilityIsChanged = false;
    let iTrack = 0; // non-scale (graph) tracks counter
    for (const track of logViewer.tracks) {
        if (isScaleTrack(track))
            continue; // skip scales
        const visible = iFrom <= iTrack && iTrack < iTo;
        if (showTrack(track, visible))
            visibilityIsChanged = true;
        iTrack++;
    }
    if (visibilityIsChanged)
        logViewer.updateTracks();
    return visibilityIsChanged;
}
export function getFirstVisibleTrack(logViewer) {
    let iTrack = 0; // non-scale (graph) tracks counter
    for (const track of logViewer.tracks) {
        if (isScaleTrack(track))
            continue; // skip scales
        if (isTrackVisible(track))
            return iTrack;
        iTrack++;
    }
    return -1;
}
export function setSelectedTrackIndices(logViewer, selectedTrackIndices) {
    let changed = false;
    if (logViewer && selectedTrackIndices) {
        let iTrack = 0;
        for (const track of logViewer.tracks) {
            const selected = selectedTrackIndices.indexOf(iTrack) >= 0;
            if (selectTrack(logViewer, track, selected))
                changed = true;
            iTrack++;
        }
    }
    return changed;
}
export function updateLegendRows(logViewer) {
    // access protected member function
    // eslint-disable-next-line
    logViewer.updateLegendRows();
}
//# sourceMappingURL=log-viewer.js.map