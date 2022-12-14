using System;
using System.Diagnostics;                 //Process
using System.IO;                          //Path

namespace runner
{
  class Program
  {
    public static void Main(string[] args)
    {
      string own_process_name            = System.Diagnostics.Process.GetCurrentProcess().ProcessName.ToLower();
      Process process                    = new Process();
      process.StartInfo                  = new ProcessStartInfo();

      process.StartInfo.FileName         = own_process_name.Contains("nodew_") ? "nodew.exe" : "node.exe";
      process.StartInfo.WorkingDirectory = System.IO.Path.GetDirectoryName(System.Diagnostics.Process.GetCurrentProcess().MainModule.FileName);      process.StartInfo.WindowStyle      = ProcessWindowStyle.Hidden;
      process.StartInfo.UseShellExecute  = false;
      process.StartInfo.Arguments        = "\"run.js\"" + " " + "\"" + own_process_name.Replace("nodew_","").Replace("node_","") + ".js" + "\"";
      process.Start();

      Console.WriteLine(
      process.StartInfo.WorkingDirectory
       );
      
      
      Console.Write("Press any key to continue . . . ");
      Console.ReadKey(true);
    }
  }
}