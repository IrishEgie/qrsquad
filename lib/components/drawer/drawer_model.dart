import '/components/dark_light_switch_small/dark_light_switch_small_widget.dart';
import '/flutter_flow/flutter_flow_util.dart';
import 'drawer_widget.dart' show DrawerWidget;
import 'package:flutter/material.dart';

class DrawerModel extends FlutterFlowModel<DrawerWidget> {
  ///  State fields for stateful widgets in this component.

  // State field(s) for MouseRegion widget.
  bool mouseRegionHovered1 = false;
  // State field(s) for MouseRegion widget.
  bool mouseRegionHovered2 = false;
  // State field(s) for MouseRegion widget.
  bool mouseRegionHovered3 = false;
  // Model for DarkLightSwitchSmall component.
  late DarkLightSwitchSmallModel darkLightSwitchSmallModel;

  @override
  void initState(BuildContext context) {
    darkLightSwitchSmallModel =
        createModel(context, () => DarkLightSwitchSmallModel());
  }

  @override
  void dispose() {
    darkLightSwitchSmallModel.dispose();
  }
}
