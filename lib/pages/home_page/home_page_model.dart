import 'package:q_r_checkin/index.dart';

import '/components/drawer/drawer_widget.dart';
import '/flutter_flow/flutter_flow_util.dart';
import 'package:flutter/material.dart';

class HomePageModel extends FlutterFlowModel<HomePageWidget> {
  ///  State fields for stateful widgets in this page.
  final unfocusNode = FocusNode();

  /// database connection
  late String apiUrl = "";
  late Connection connectionStatus = Connection.NULL;

  /// Debug mode
  late bool isDebug = true;

  /// Property for Ticket Class
  late Map<String, dynamic> ticket;
  // Model for Drawer component.
  late DrawerModel drawerModel;
  // State field(s) for TextField widget.
  FocusNode? textFieldFocusNode;
  TextEditingController? textController;
  String? Function(BuildContext, String?)? textControllerValidator;

  @override
  void initState(BuildContext context) {
    drawerModel = createModel(context, () => DrawerModel());
  }

  @override
  void dispose() {
    unfocusNode.dispose();
    drawerModel.dispose();
    textFieldFocusNode?.dispose();
    textController?.dispose();
  }
}
