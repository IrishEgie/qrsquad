import '/components/dark_light_switch_small/dark_light_switch_small_widget.dart';
import '/components/debug_switch/debug_switch_widget.dart';
import '/components/log_switch/log_switch_widget.dart';
import '/flutter_flow/flutter_flow_util.dart';
import 'drawer_widget.dart' show DrawerWidget;
import 'package:flutter/material.dart';

class DrawerModel extends FlutterFlowModel<DrawerWidget> {
  ///  State fields for stateful widgets in this component.

  // State field(s) for MouseRegion widget.
  bool mouseRegionHovered1 = false;
  // Model for LogSwitch component.
  late LogSwitchModel logSwitchModel;
  // State field(s) for MouseRegion widget.
  bool mouseRegionHovered2 = false;
  // Model for DebugSwitch component.
  late DebugSwitchModel debugSwitchModel;
  // State field(s) for MouseRegion widget.
  bool mouseRegionHovered3 = false;
  // State field(s) for MouseRegion widget.
  bool mouseRegionHovered4 = false;
  // State field(s) for MouseRegion widget.
  bool mouseRegionHovered5 = false;
  // Model for DarkLightSwitchSmall component.
  late DarkLightSwitchSmallModel darkLightSwitchSmallModel;

  @override
  void initState(BuildContext context) {
    logSwitchModel = createModel(context, () => LogSwitchModel());
    debugSwitchModel = createModel(context, () => DebugSwitchModel());
    darkLightSwitchSmallModel =
        createModel(context, () => DarkLightSwitchSmallModel());
  }

  @override
  void dispose() {
    logSwitchModel.dispose();
    debugSwitchModel.dispose();
    darkLightSwitchSmallModel.dispose();
  }
}
