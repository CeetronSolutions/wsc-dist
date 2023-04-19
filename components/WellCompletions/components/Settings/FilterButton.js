import { Button, Icon, Tooltip } from "@equinor/eds-core-react";
import { filter_alt } from "@equinor/eds-icons";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateIsDrawerOpen } from "../../redux/actions";
// Use library approach
Icon.add({ filter_alt }); // (this needs only be done once)
/**
 * A button for toggle on and off the filter functions in the side drawer
 */
const FilterButton = React.memo(() => {
    //Redux
    const dispatch = useDispatch();
    const isDrawerOpen = useSelector((state) => state.ui.isDrawerOpen);
    // Handlers
    const onClick = useCallback(() => dispatch(updateIsDrawerOpen(!isDrawerOpen)), [dispatch, isDrawerOpen]);
    //Render
    return (React.createElement("div", null,
        React.createElement(Tooltip, { title: isDrawerOpen ? "Close filter menu" : "Filter" },
            React.createElement(Button
            //This is an attribute for testing purpose only.
            //It can be removed using https://www.npmjs.com/package/babel-plugin-react-remove-properties.
            , { "data-testid": "filter_button", 
                // Indicate the drawer is open by having the outlined border
                variant: isDrawerOpen ? "outlined" : "ghost_icon", onClick: onClick },
                React.createElement(Icon, { color: "currentColor", name: "filter_alt" })))));
});
FilterButton.displayName = "FilterMenu";
export default FilterButton;
//# sourceMappingURL=FilterButton.js.map