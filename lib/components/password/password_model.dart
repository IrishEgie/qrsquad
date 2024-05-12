import '/flutter_flow/flutter_flow_util.dart';
import 'password_widget.dart' show PasswordWidget;
import 'package:flutter/material.dart';

class PasswordModel extends FlutterFlowModel<PasswordWidget> {
  ///  Local state fields for this component.

  bool exportClient = false;

  bool exportServer = true;

  ///  State fields for stateful widgets in this component.

  // State field(s) for passfield widget.
  FocusNode? passfieldFocusNode;
  TextEditingController? passfieldTextController;
  late bool passfieldVisibility;
  String? Function(BuildContext, String?)? passfieldTextControllerValidator;

  @override
  void initState(BuildContext context) {
    passfieldVisibility = false;
  }

  @override
  void dispose() {
    passfieldFocusNode?.dispose();
    passfieldTextController?.dispose();
  }
}
