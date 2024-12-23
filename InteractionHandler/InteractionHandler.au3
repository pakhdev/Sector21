If $CmdLine[0] >= 1 Then
    Local $command = StringLower($CmdLine[1])

    Switch $command
        Case "click"
            MouseClick("left")

        Case "move"
            If $CmdLine[0] >= 3 Then
                Local $x = Number($CmdLine[2])
                Local $y = Number($CmdLine[3])
                mouseMove($x, $y)
            Else
                MsgBox(0, "Error", "Usage: move x y")
            EndIf

        Case "scroll"
            If $CmdLine[0] >= 2 Then
                Local $amount = Number($CmdLine[2])
                smoothScroll($amount)
            Else
                MsgBox(0, "Error", "Usage: scroll amount")
            EndIf

        Case Else
            MsgBox(0, "Error", "Unknown command: " & $command)
    EndSwitch
Else
    MsgBox(0, "Error", "No arguments provided.")
EndIf


; --- Easing Functions ---
Func __calci1($i, $sm)
    Return $i ^ $sm
EndFunc

Func __calci2($i, $sm)
    Return 1 - ((1 - $i) ^ $sm)
EndFunc

Func __calci($i, $sm)
    If $i < 0.5 Then
        Return __calci1($i * 2, $sm) / 2
    Else
        Return __calci2(($i - 0.5) * 2, $sm) / 2 + 0.5
    EndIf
EndFunc

Func __calof($i, $sm)
    If $i < 0.5 Then
        Return __calci($i * 2, $sm)
    Else
        Return __calci((1 - $i) * 2, $sm)
    EndIf
EndFunc

; --- Main Mouse Move Function ---
Func mouseMove2($x2, $y2)
    Local $x1 = MouseGetPos(0)
    Local $y1 = MouseGetPos(1)

    Local $xv = Random(-80, 80)
    Local $yv = Random(-80, 80)
    Local $sm = Random(1.5, 2.5)
    Local $m = Random(80, 140)

    For $i = 0 To $m
        Local $t = $i / $m
        Local $ci = __calci($t, $sm)
        Local $co = __calof($t, $sm)

        Local $cx = $x1 + (($x2 - $x1) * $ci) + ($xv * $co)
        Local $cy = $y1 + (($y2 - $y1) * $ci) + ($yv * $co)

        MouseMove($cx, $cy, 0)
        Sleep(1)
    Next
EndFunc

Func smoothScroll($amount)
	$stepSize = 266;
	$amount = Ceiling($amount / $stepSize);
    Local $direction = 0
    If $amount > 0 Then
        $direction = "down"
    Else
        $direction = "up"
    EndIf

    Local $steps = Abs($amount)
    Local $sm = Random(1.5, 2.5)

    For $i = 0 To $steps
        Local $t = $i / $steps
        Local $ci = __calci($t, $sm)

        MouseWheel($direction, 1)
        Sleep(5 + (15 * (1 - $ci)))
    Next
EndFunc
