/*
 * Copyright 2021, 2024 Uber Technologies, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/** @file
 * @brief cli app that exposes most of the H3 C library for scripting
 *
 *  See `h3 --help` for usage.
 */

#include <string.h>

#ifdef _WIN32

#define strcasecmp _stricmp

#else

#include <strings.h>

#endif

#include "args.h"
#include "h3Index.h"
#include "utility.h"

bool has(char *subcommand, int level, char *argv[]) {
    return strcasecmp(subcommand, argv[level]) == 0;
}

bool cellToLatLngCmd(int argc, char *argv[]) {
    Arg cellToLatLngArg = {
        .names = {"cellToLatLng"},
        .required = true,
        .helpText = "Convert an H3 cell to a WKT POINT coordinate",
    };
    Arg helpArg = ARG_HELP;
    DEFINE_CELL_ARG(cell, cellArg);
    Arg *args[] = {&cellToLatLngArg, &helpArg, &cellArg};
    if (parseArgs(argc, argv, sizeof(args) / sizeof(Arg *), args, &helpArg,
                  "Convert an H3 cell to a WKT POINT coordinate")) {
        return helpArg.found;
    }
    LatLng ll;
    H3Error err = H3_EXPORT(cellToLatLng)(cell, &ll);
    if (err) {
        return false;
    }
    // Using WKT formatting for the output. TODO: Add support for JSON
    // formatting
    printf("POINT(%.10lf %.10lf)\n", H3_EXPORT(radsToDegs)(ll.lng),
           H3_EXPORT(radsToDegs)(ll.lat));
    return true;
}

bool latLngToCellCmd(int argc, char *argv[]) {
    int res = 0;
    double lat = 0;
    double lng = 0;

    Arg latLngToCellArg = {
        .names = {"latLngToCell"},
        .required = true,
        .helpText =
            "Convert degrees latitude/longitude coordinate to an H3 cell.",
    };
    Arg helpArg = ARG_HELP;
    Arg resArg = {.names = {"-r", "--resolution"},
                  .required = true,
                  .scanFormat = "%d",
                  .valueName = "res",
                  .value = &res,
                  .helpText = "Resolution, 0-15 inclusive."};
    Arg latArg = {.names = {"--lat", "--latitude"},
                  .required = true,
                  .scanFormat = "%lf",
                  .valueName = "lat",
                  .value = &lat,
                  .helpText = "Latitude in degrees."};
    Arg lngArg = {.names = {"--lng", "--longitude"},
                  .required = true,
                  .scanFormat = "%lf",
                  .valueName = "lng",
                  .value = &lng,
                  .helpText = "Longitude in degrees."};

    Arg *args[] = {&latLngToCellArg, &helpArg, &resArg, &latArg, &lngArg};
    if (parseArgs(
            argc, argv, sizeof(args) / sizeof(Arg *), args, &helpArg,
            "Convert degrees latitude/longitude coordinate to an H3 cell.")) {
        return helpArg.found;
    }
    LatLng ll = {.lat = H3_EXPORT(degsToRads)(lat),
                 .lng = H3_EXPORT(degsToRads)(lng)};

    H3Index c;
    H3Error e = H3_EXPORT(latLngToCell)(&ll, res, &c);

    // TODO: Add support for JSON formatting
    if (e == E_SUCCESS) {
        h3Println(c);
    } else {
        h3Println(H3_NULL);
    }
    return true;
}

bool cellToBoundaryCmd(int argc, char *argv[]) {
    Arg cellToBoundaryArg = {
        .names = {"cellToBoundary"},
        .required = true,
        .helpText = "Convert an H3 cell to a WKT POLYGON defining its boundary",
    };
    Arg helpArg = ARG_HELP;
    DEFINE_CELL_ARG(cell, cellArg);
    Arg *args[] = {&cellToBoundaryArg, &helpArg, &cellArg};
    if (parseArgs(
            argc, argv, sizeof(args) / sizeof(Arg *), args, &helpArg,
            "Convert an H3 cell to a WKT POLYGON defining its boundary")) {
        return helpArg.found;
    }
    CellBoundary cb;
    H3Error err = H3_EXPORT(cellToBoundary)(cell, &cb);
    if (err) {
        return false;
    }
    // Using WKT formatting for the output. TODO: Add support for JSON
    // formatting
    printf("POLYGON((");
    for (int i = 0; i < cb.numVerts; i++) {
        LatLng *ll = &cb.verts[i];
        printf("%.10lf %.10lf, ", H3_EXPORT(radsToDegs)(ll->lng),
               H3_EXPORT(radsToDegs)(ll->lat));
    }
    // WKT has the first and last points match, so re-print the first one
    printf("%.10lf %.10lf))\n", H3_EXPORT(radsToDegs)(cb.verts[0].lng),
           H3_EXPORT(radsToDegs)(cb.verts[0].lat));
    return true;
}

bool generalHelp(int argc, char *argv[]) {
    Arg helpArg = ARG_HELP;
    Arg cellToLatLngArg = {
        .names = {"cellToLatLng"},
        .helpText = "Convert an H3 cell to a WKT POINT coordinate",
    };
    Arg latLngToCellArg = {
        .names = {"latLngToCell"},
        .helpText =
            "Convert degrees latitude/longitude coordinate to an H3 cell.",
    };
    Arg cellToBoundaryArg = {
        .names = {"cellToBoundary"},
        .helpText = "Convert an H3 cell to a WKT POLYGON defining its boundary",
    };
    Arg *args[] = {&helpArg, &cellToLatLngArg, &latLngToCellArg,
                   &cellToBoundaryArg};

    const char *helpText =
        "Please use one of the subcommands listed to perform an H3 "
        "calculation. Use h3 <SUBCOMMAND> --help for details on the usage of "
        "any subcommand.";
    return parseArgs(argc, argv, sizeof(args) / sizeof(Arg *), args, &helpArg,
                     helpText);
}

int main(int argc, char *argv[]) {
    if (argc <= 1) {
        printf("Please use h3 --help to see how to use this command.\n");
        return 1;
    }
    if (has("cellToLatLng", 1, argv) && cellToLatLngCmd(argc, argv)) {
        return 0;
    }
    if (has("latLngToCell", 1, argv) && latLngToCellCmd(argc, argv)) {
        return 0;
    }
    if (has("cellToBoundary", 1, argv) && cellToBoundaryCmd(argc, argv)) {
        return 0;
    }
    if (generalHelp(argc, argv)) {
        return 0;
    }
    printf("Please use h3 --help to see how to use this command.\n");
    return 1;
}
