// ==UserScript==
// @name         TUWEL LectureTube Progress Save
// @namespace    https://schnst.at/
// @version      1.0.0
// @description  Save / load watch progress from course recordings
// @author       Nils Schneider-Sturm
// @match        https://oc-presentation.ltcc.tuwien.ac.at/*
// @copyright    2023+, Nils Schneider-Sturm, THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
// ==/UserScript==

(function() {
    'use strict';

    var refresh_interval_in_ms = 500;

    function get_paella() {
        if (window.paella != undefined) return window.paella;
        if (typeof paella !== "undefined") return paella;
        return undefined;
    }

    var first_run = true;
    var storage_key;
    var storage = localStorage;
    var _paella;

    async function loop() {
        if (! (_paella = get_paella()) || ! _paella.player.videoContainer)
            return;

        if (first_run) {
            first_run = false;
            storage_key = "paella_seek_" + _paella.player.videoIdentifier;

            if (storage.getItem(storage_key) != null)
                _paella.player.videoContainer.seekToTime(
                    Number(storage.getItem(storage_key)));
            return;
        }
        storage.setItem(storage_key, String(await _paella.player.videoContainer.currentTime()))
    }

    setInterval(loop, refresh_interval_in_ms)
})();